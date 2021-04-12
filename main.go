package main

import (
	"encoding/json"
	"fmt"
	utils "hospital-auto-register/utils"

	"github.com/imroc/req"
	_ "github.com/robertkrimen/otto/underscore"
)

var token = "这里填用户登录token"

func main() {
	getData()
}

func getData() {
	// 获取医生信息
	docInfo := getDoctorInfo()
	if docInfo.AmPm != "" {
		createOrder(docInfo)
	}
}

func getDoctorInfo() DoctorInfo {
	url := "/api/appointmentInfo/getYyDoctorInfo.json"
	dataStr := "{\"time\":\"2021-04-12\",\"deptCode\":683,\"tapIndex\":0}"
	encryData, _ := utils.EncryToken(dataStr, token, url)
	param := req.Param{
		"time":     "2021-04-12",
		"deptCode": "683",
		"tapIndex": "0",
	}
	res := utils.GetHttpData(encryData, param)
	if res == "" {
		return DoctorInfo{}
	}
	var docInfo DoctorInfoBase
	transErr := json.Unmarshal([]byte(res), &docInfo)
	if transErr != nil {
		fmt.Println("转换出错：", transErr)
	}
	for _, item := range docInfo.Data {
		if item.Fee == 100 {
			return item
		}
	}
	for _, item := range docInfo.Data {
		if item.Fee == 60 {
			return item
		}
	}
	return DoctorInfo{}
}

func createOrder(docInfo DoctorInfo) {
	url := "/api/appointmentRecord/samedayAppointment.json"
	dataStr := "{\"patientId\":\"123456\",\"scheduleId\":" + docInfo.ScheduleId + ",\"visitDate\":\"2021-04-11\",\"deptId\":\"683\"}"
	encryData, _ := utils.EncryToken(dataStr, token, url)
	param := req.Param{
		"patientId":  "123456",
		"scheduleId": docInfo.ScheduleId,
		"visitDate":  "2021-04-11",
		"deptId":     "683",
	}
	res := utils.PostHttpData(encryData, param)
	fmt.Println("结果", res)
}

type DoctorInfoBase struct {
	Data []DoctorInfo `json:"data"`
}
type DoctorInfo struct {
	AmPm           string `json:"amPm"`
	DoctId         string `json:"doctId"`
	DoctImgUrl     string `json:"doctImgUrl"`
	DoctIntroduced string `json:"doctIntroduced"`
	DoctName       string `json:"doctName"`
	Fee            int    `json:"fee"`
	Numbers        int    `json:"numbers"`
	ScheduleId     string `json:"scheduleId"`
	SeqDoct        string `json:"seqDoct"`
	VisitDate      int64  `json:"visitDate"`
	VisitTime      string `json:"visitTime"`
	Ygzc           string `json:"ygzc"`
	Znumber        int    `json:"znumber"`
}

type EncryData struct {
	Encrypt string `json:"encrypt"`
}

func JsonToMap(str string) map[string]interface{} {

	var tempMap map[string]interface{}

	err := json.Unmarshal([]byte(str), &tempMap)

	if err != nil {
		panic(err)
	}

	return tempMap
}
