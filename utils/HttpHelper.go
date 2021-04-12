package utils

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"strings"

	"github.com/imroc/req"
	"github.com/robertkrimen/otto"
)

type EncryData struct {
	Encrypt string `json:"encrypt"`
}
type BaseData struct {
	Url    string `json:"url"`
	Method string `json:"method"`
	Header struct {
		XToken     string `json:"x-token"`
		XNonce     string `json:"x-nonce"`
		XTimestamp string `json:"x-timestamp"`
		XSign      string `json:"x-sign"`
	} `json:"header"`
	Data struct {
		// DeptCode int `json:"deptCode"`
		TapIndex int `json:"tapIndex"`
	} `json:"data"`
}

func GetHttpData(tokenStr string, param req.Param) string {
	return httpBase(tokenStr, param, "GET")
}

func PostHttpData(tokenStr string, param req.Param) string {
	return httpBase(tokenStr, param, "POST")
}

func httpBase(data string, param req.Param, httpType string) string {

	filePath := "./js/wxutil.js"
	bytes, err := ioutil.ReadFile(filePath)
	if err != nil {
		panic(err)
	}
	vm := otto.New()
	_, err = vm.Run(string(bytes))
	if err != nil {
		panic(err)
	}

	if data == "" {
		panic("无效数据")
	}
	var baseData BaseData
	transErr := json.Unmarshal([]byte(data), &baseData)
	if transErr != nil {
		panic(transErr)
	}
	authHeader := joinHeader(baseData)
	var encryData EncryData
	var encryData2 interface{}
	if strings.ToUpper(httpType) == "GET" {
		r, err := req.Get(baseData.Url, authHeader, param)
		r.ToJSON(&encryData)
		if err != nil {
			fmt.Println(err)
		}
		if encryData.Encrypt == "" {
			r.ToJSON(&encryData2)
			log.Printf("%s：%+v", "----请求结果--错误", encryData2)
			return ""
		}
	} else {
		r, err := req.Post(baseData.Url, authHeader, param)
		r.ToJSON(&encryData)
		if err != nil {
			fmt.Println(err)
		}
		if encryData.Encrypt == "" {
			r.ToJSON(&encryData2)
			log.Printf("%s：%+v", "----请求结果--错误", encryData2)
			return ""
		}
	}
	log.Println("----请求结束", encryData.Encrypt)
	decryStr := DecryStr(baseData.Header.XSign, encryData.Encrypt)
	return decryStr
}

func joinHeader(baseData BaseData) req.Header {
	header := req.Header{
		"Accept":          "*/*",
		"x-timestamp":     baseData.Header.XTimestamp,
		"Accept-Encoding": "gzip, deflate, br",
		"Accept-Language": "zh-cn",
		"Content-Type":    "application/json;charset=UTF-8",
		"Host":            "bdkq.leanpay.cn",
		"Referer":         "https://servicewechat.com/wxf47aa38d871be854/101/page-frame.html",
		"User-Agent":      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.3(0x18000323) NetType/WIFI Language/zh_CN",
		"x-sign":          baseData.Header.XSign,
		"x-nonce":         baseData.Header.XNonce,
		"x-token":         baseData.Header.XToken,
	}
	return header
}
