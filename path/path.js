/***
 * 
 * __dirname , __filename 总是返回文件的绝对路径
 * 
 * process.cwd() 总是返回执行node命令所在的文件夹
 * 
 *  ./  
 * 
 * 再require方法中总是相对当前文件所在文件夹
 * 再其他地方和process.cwd() 一样，返回执行node命令所在的文件夹
 * ***/