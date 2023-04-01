# E-PARTOGRAM CLIENT

### **Documentation**

*  [Product Documentation](./ProductDoc.md)

*  [User Documentation](./UserDoc.md)

* [Video](https://youtu.be/CqxlY7_WzHk)

* [Web-site](https://epartogram.captainirs.dev)

* [Android-App](https://github.com/Muhesh7/epartogram-TWA/blob/main/app/release/app-release.apk)

### **Description**
* Web Application for E-Partogram System to aid and improve the technology support for Partogram Digitally.

* A partogram is used to record all observations made when the woman is in labor. It records the following points. The progress of labor is monitored by cervical dilatation, descent of head and uterine contractions.

* The ePartogram project aims to address this challenge by developing a digital platform for recording and monitoring partograms.

* The ePartogram project aligns with SDG 3, which aims to improve global health and wellbeing by reducing mortality rates, increasing access to healthcare, and promoting healthy lifestyles. In India and Africa, this is particularly important as both regions face significant maternal and child health challenges.

* The ePartogram platform also includes various Google technologies, such as `Firebase`, `PWA`, `TWA`, `Google Maps API`,`Google Translatation API` and `Google Cloud Platform`. These technologies can help to streamline app development and improve app performance, scalability, and security.

* For More Details, Refer [Product Documentation](./ProductDoc.md)

* For User Instructions, Refer [User Documentation](./UserDoc.md)

___
### **Architecture**

![](https://imgur.com/X3wau2Z.png)

### **Tech-Stack**

![](https://imgur.com/MXtiN2l.png)

### **Requirements**

-   Install NodeJS. Instructions are given in the official [NodeJS](https://nodejs.org/en) website.
-   Running instance of E-PARTOGRAM API [e-partogram-server](https://github.com/CaptainIRS/epartogram-server.git). Instructions to set up the API developed by us is given in the API repository.

-   Android App Version of the Client is available as E-PARTOGRAM-TWA(Trusted Web Activity) [e-partogram-TWA](https://github.com/Muhesh7/epartogram-TWA.git). Instructions to install the android app is available in the respository.

-  Periodic Scheduler CronJob is used to scan through the patient records and alert the `Nurse` via notification if the Nurse misses to take a `Patient`'s Reading [e-partogram-scheduler](https://github.com/Muhesh7/epartogram-scheduler.git). Instructions to install the CronJob is available in the resposittory.

### **Setup**

-   Install dependencies
    ```bash
    yarn
    ```
-   Create config.js and fill in the config values.
    ```bash
    cp src/config.example.js src/config.js
    ```
-   Start React app
    ```bash
    yarn start
    ```
