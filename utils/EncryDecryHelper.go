package utils

import (
	"io/ioutil"
	"math/rand"
	"strconv"
	"strings"
	"time"

	"github.com/robertkrimen/otto"
)

var r = rand.New(rand.NewSource(time.Now().UnixNano()))

func EncryToken(dataStr string, token string, url string) (string, string) {
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

	// 获取医生列表
	xnonce := getXNonce()
	req := "{\"url\":\"" + url + "\",\"data\":" + dataStr + ",\"x-nonce\":\"" + xnonce + "\",\"accessToken\":\"" + token + "\"}"
	value, err := vm.Call("ALL.request", nil, req)
	if err != nil {
		panic(err)
	}
	return value.String(), xnonce
}

func DecryStr(xSign string, encryStr string) string {
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
	req := "{\"header\":{\"x-sign\":\"" + xSign + "\"}}"
	res := "{\"data\": {\"encrypt\":\"" + encryStr + "\"},\"header\":{\"x-encrypt\":1}}"
	value, err := vm.Call("ALL.CC", nil, req, res)
	if err != nil {
		panic(err)
	}
	return value.String()
}

func getXNonce() string {
	list := make([]string, 36)
	defaultList := strings.Split("0123456789abcdef", "")
	for i := 0; i < 36; i++ {
		list[i] = defaultList[r.Intn(16)]
	}
	list[14] = "4"
	number_int, err := strconv.Atoi(list[19])
	if err != nil {
		number_int = 0
	}
	index19 := 3&number_int | 8
	list[19] = defaultList[index19]
	list[8] = "-"
	list[13] = "-"
	list[18] = "-"
	list[23] = "-"
	return strings.Join(list, "")
}
