# :desktop_computer: 112-1 NTNU TAHRD DataBase
* <em><strong>Name：李騰騏
* Grade：TAHRD 2nd grade 
* Professor:Pecu Tsai</strong></em>
# :clipboard:Notebook  
MySQL:  
To add *VALUS* in tables:  

    INSERT INTO table_name (column1, column2, column3, ...)
    VALUES (value1, value2, value3, ...);  
To *Inner* join table:  
    
    SELECT column_name(s)
    FROM table1
    INNER JOIN table2
    ON table1.column_name = table2.column_name;
MongoDB:
To *Connect* with mongoDB the Method:  
    
    const mongoose = require("mongoose");
    mongoose.connect("your mongoDB url",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
If *don't* have mongoose before:
    
    npm install mongoose
# :page_facing_up: Homework
> [#HW0](https://youtu.be/SnuzbTM76Zo)  
> [#HW1](https://youtu.be/i7UKnYl19Ic)  
> [#HW2](https://youtu.be/jxMI68Kicy4)
> [#HW2-2](https://youtu.be/d1XJAmbLwBA)  
> [#HW3](https://youtu.be/k13Rc4UDeaU)  
> [#HW4](https://youtu.be/CjbeSUIchsY)  
> [#HW5](https://youtu.be/6A3VJJPla_Q)
# :file_folder: Program with MySQL & node.js
[Final Project Github link](https://github.com/DBfp/DB_fp?tab=readme-ov-file)
* 簡介:製作一個朋友間的修課查詢系統，能夠新增朋友，朋友間可以互相查詢對方選定的課程，同時可以刪除朋友，建立課程或是進行選課。
* 提案及ERD-Map:[Youtube link](https://www.youtube.com/watch?v=HxzPlhvYYh4)
* ERD-Map更改及課程匯入:[Youtube link](https://www.youtube.com/watch?v=cbuuMkLK1sw)
* Search Function:[Youtube link](https://www.youtube.com/watch?v=d-j4gsbhNsA)
* Final Project:[Youtube link](https://www.youtube.com/watch?v=6HQszu_cbws)
