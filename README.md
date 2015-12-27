# dualnohm
Using Node Object Hash Mapper with redis in a dual server configuration(DEMO)
***
In this example the same server is run twice listening to different ports but the same would apply to different cooperating servers.
### Setup
1. copy start.env.template to start.env and configure it according to your environment
2.
```shell
npm install
```
from the project root
3. npm start


depwndencies
|   dependency  |   optional    |   type        |
|   ----------  |   ---------   |   ____        |
|   pm2         |   yes*        |   environment |
|   redis       |   no          |   environment |
|   node        |   no          |   global      |
***
*A substitude should be supplied
