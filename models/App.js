const db = require('../db/database')

class Apps {
    constructor(appName, catagory, description, appLocation,
        icon, screenshots,devId,functOne,functTwo,functThree,functFour) {
        this.appName = appName;
        this.catagory = catagory,
        this.description = description,
        this.appLocation = appLocation;
        this.icon = icon;
        this.screenshots = screenshots;
        this.dev_id = devId;
        this.funcOne = functOne,
        this.funcTwo = functTwo,
        this.funcThree = functThree,
        this.funcfour = functFour
        
    }


     save() {
        const d = new Date();
        const year = d.getFullYear();
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const date = `${year}-${month}-${day}`;

        try {
            let sql = `INSERT INTO apps(appName,catagory,description,appLocation,icon,screenshotOne,screenshotTwo,screenshotThree,publishedDate,dev_id,
                funcOne,funcTwo,funcThree,funcFour) 
             VALUES ('${this.appName}','${this.catagory}','${this.description}','${this.appLocation}','${this.icon}',
            '${this.screenshots[0]}','${this.screenshots[1]}','${this.screenshots[2]}','${date}',${this.dev_id},'${this.funcOne}',
            '${this.funcTwo}','${this.funcThree}','${this.funcfour}');`;
            return new Promise((resolve, reject) => {
                resolve(db.execute(sql));
            })
        } catch (err) {
            console.log(err)
        };
    }
    static async find(name)
    {
        const sql = `SELECT * FROM apps WHERE appName='${name}';`;
        const [result, _] = await db.execute(sql);
        return result[0];
    }
    static async ListApps(id)
    {
        const sql = `SELECT * FROM apps WHERE dev_id=${id}`;
        const [result, _] = await db.execute(sql);
        return result
    }
    static async ListAppsForUsers(id)
    {
        const sql = `SELECT * FROM apps WHERE appid=${id}`;
        const [result, _] = await db.execute(sql);
        return result
    }
    static async getAppsPath(appid,id)
    {
        const sql = `SELECT * FROM apps WHERE dev_id=${id} AND appid=${appid}`;
        const [result, _] = await db.execute(sql);
        return result
    }
    static async updateApp(appid, publishedOn,appUrl)
    {
        try{            
            let sql = `INSERT INTO previousversions(appid, published_on,file_location) VALUES(${appid},'${publishedOn}', '${appUrl}');`
            return new Promise((resolve, reject) => {
                resolve(db.execute(sql));
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    static async UpdateTheAppTable(ApkLocation, description, screenshotsArray,ApkID,funcOne,funcTwo,funcThree,funcFour)
    {
        const d = new Date();
        const year = d.getFullYear();
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const updatedDate = `${year}-${month}-${day}`;
        try{
            
            let sql = `UPDATE apps
            SET description = '${description}', appLocation = '${ApkLocation}', screenshotOne = '${screenshotsArray[0]}', screenshotTwo = '${screenshotsArray[1]}',
            screenshotThree = '${screenshotsArray[2]}',publishedDate = '${updatedDate}',funcOne = '${funcOne}',
            funcTwo = '${funcTwo}',funcThree = '${funcThree}',funcFour = '${funcFour}' WHERE appid = ${ApkID};`
            return new Promise((resolve, reject) => {
                resolve(db.execute(sql));
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    
    static async deleteApps(appid, devid)
    {
        const sql = `DELETE FROM apps where appid = ${appid} AND dev_id =${devid};`
        const delResult = await db.execute(sql);
        return delResult
    }
    static async LoadNewApps()
    {
        const sql = `SELECT * FROM apps ORDER BY publishedDate ASC`;
        const [orderedResult, _] = await db.execute(sql);
        return orderedResult;
    }
    static async LoadAllCommnets(appid)
    {
        const sql = `SELECT user.name, comments.commentOne,comments.commentTwo FROM user, 
        comments WHERE user.user_id = comments.user_id AND Tappid = ${appid} ORDER BY comments.published_date ASC; `;
        const [orderedComments, _] = await db.execute(sql);
        return orderedComments;
    }

    static async Download(app_id)
    {
        const sql = `SELECT appLocation FROM apps where appid = ${app_id}`;
        const result = await db.execute(sql);
        return result[0][0].appLocation
    }
    static async checkAppisReported(app_id, user_id)
    {
        const sql = `SELECT * FROM alreadyreported where reported_appid = ${app_id} AND reporter_id = ${user_id}`;
        const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
        return result;
    }
    static async GetReportandDownload(app_id)
    {
        const sql = `SELECT downloads,appReports,dev_id FROM apps where appid = ${app_id}`;
        const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
        return result;
    }
    static async ReportApp(appId)
    {
        const sql = `UPDATE apps SET appReports = appReports + 1 WHERE appid = ${appId}`;
        return new Promise((resolve, reject) => {
            resolve(db.execute(sql));
        })
    }
    static async InserttoReporteds(reporter_id, appId)
    {
        const sql = `INSERT INTO alreadyreported(reporter_id, reported_appid) VALUES(${reporter_id}, ${appId})`;
        return new Promise((resolve, reject) => {
            resolve(db.execute(sql));
        })
    }
    static async AddtoblackListAppsTable(appId, reported_dev_id)
    {
        const sql = `INSERT INTO blacklistedapps(reportedappid, thedeveloperid) VALUES(${appId}, ${reported_dev_id})`;
        return new Promise((resolve, reject) => {
            resolve(db.execute(sql));
        })
    }
    static async GetAlreadyVistedId(viewer_id, viewedapp_id)
    {
        const sql = `SELECT * FROM viewerstable WHERE theviwer_id = ${viewer_id} AND theviwed_app_id = ${viewedapp_id}`;
        const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
        return result;
    }
    static async UpdateAlreadyVistedId(viewer_id, viewedapp_id)
    {
        const sql = `INSERT INTO viewerstable(theviwer_id, theviwed_app_id) VALUES(${viewer_id}, ${viewedapp_id})`;
        const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
        return result;
    }
    static async updateViewCount(appId)
    {
        const sql = `UPDATE apps SET views = views + 1 WHERE appid = ${appId}`;
        return new Promise((resolve, reject) => {
            resolve(db.execute(sql));
        })
    }


}


module.exports = Apps;