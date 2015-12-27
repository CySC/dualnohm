# dualnohm
Using Node Object Hash Mapper with redis in a dual server configuration(DEMO)
***
In this example the same server is run twice listening to different ports but the same would apply to different cooperating servers.
### Setup
1. copy .env.template files in scripts directory to .env and configure them according to your environment

2. ```npm install``` from the project root

3. ```npm start``` from the project root


dependencies:

|   dependency  |   optional    |   type        |   sample setup command                |
|   ----------  |   ---------   |   ----        |   --------------------                |
|   node        |   no          |   global      |   sudo npm install -g n&& n stable    |
|   pm2         |   yes*        |   environment |   sudo npm install -g pm2             |
|   redis       |   no          |   environment |   sudo yum install redis              |

***
**A substitute should be supplied or you can use node directly. In both cases you will need to configure this in  *.env(copies of *env.template scripts) scripts in scripts directory
