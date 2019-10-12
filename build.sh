#!/bin/bash

pid=$$
function make_output() {
    # 创建output目录，用于存放产出
    local output="output"
    if [ -d $output ];then
        rm -rf $output
    fi
    mkdir -p $output

    # 填充output目录, output的内容即为待部署内容
    # 拷贝必要的文件和目录至output目录
    cp -rf ./deploy/* ${output}/

    local ret=$?
    return $ret
}

##########################################
## main
## 其中,
##
##      1.生成部署包output
##########################################
# 1.生成部署包output
make_output
ret=$?
if [ $ret -eq 0 ];then
    echo -e "===== 🔥🔥🔥🎉 🎉 🎉  Congratulations, Generate Success ====="
else
    echo -e "===== Generate output failure ====="
fi
exit $ret