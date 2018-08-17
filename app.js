const jsonApiHeader = {
  "Content-Type": "application/json; charset=UTF-8",
  "Authorization": "key=YOUR_KEY",
};

var app = new Vue({
  el: '#app',
  data: {
    alertMsg : "",
    fcmUrl : "https://fcm.googleapis.com/fcm/send",
    fcmJson :{
      to : "/topics/your_topics_to_send",
      content_available : true,
      notification : {
        title : "",
        body : "" ,
        click_action : "FCM_PLUGIN_ACTIVITY",
        sound : "default",
        priority : "priority",
      },
      data : {
        app_notification : "1",
        term : "48",
        activity_date : "2018-08-16 15:30:00",
        msg_type : "1",
        student_id : "1111",
        college_code : "edrdemo",
        notification_from_firebase : "1",
        avatar_img_url : "0",
      }
    }
  },
  methods: {
    submitAction: function () {

      if(!this.fcmJson.notification.title || !this.fcmJson.notification.body || !this.fcmJson.to){
        this.alertMsg = '<span class="text-danger">title, body, to can\'t empty</span>'
      }else{
        this.alertMsg = 'Please wait...'
        console.log('submitAction');
        this.postToFirebase().then((resualt) => {
          console.log(resualt);
          this.alertMsg = '';
        });
      }
    },
    async postToFirebase() {

      console.log('postToFirebase');
      const dataParam = this.fcmJson;
      try {
        const response = await  axios({
          method: 'post',
          url: this.fcmUrl,
          headers: jsonApiHeader,
          data: dataParam
        });
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  }
})