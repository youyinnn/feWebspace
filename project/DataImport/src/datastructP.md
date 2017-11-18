### 数据结构规约

> 1. 表映射结构：
>
> - 所属工作流：导入至数据库——文件上传——进入映射——[确定映射]
>
> - 结构描述：把用户填写的映射规则发给后台，让后台根据映射规则建立表。
>
> - 结构样例：{"tableName":"a","database":"MySQL","姓名":"b","电话":"c","地址":"d","联系人":"e","粉丝":"f","余额":"g","信用":"h"}
>
> - 后台转化建议：
> ``` java
> HashMap<String, String> parse = JSON.parseObject(mapping, HashMap.class);
> ```
