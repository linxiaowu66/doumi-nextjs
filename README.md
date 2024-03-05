
##
使用最新的mysql服务器，配合`mysql`包使用会报错：`Client does not support authentication protocol requested by server; consider upgrading MySQL client`，解决办法是：替换`mysql`包为`mysql2`即可；