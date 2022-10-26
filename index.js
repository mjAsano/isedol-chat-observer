channel_id = document.getElementsByName('name')[0].value

function change_channel(id) {
    channel_id = id
    document.getElementsByName('name')[0].value = channel_id
    read_video_list()
}

function read_video_list(){
    videos = document.querySelector('.video_list')
    videos.innerHTML = ``

    fetch(`http://0.0.0.0:8000/videos/${channel_id}/`).then((Response) => {
        return Response.json()
    }).then((data) => {
        json = JSON.stringify(data)
        obj = JSON.parse(json)
        list = obj.list
        console.log(list)
        for (const i in list) {
            videos.innerHTML = videos.innerHTML + `<div class='${list[i]}'><a>${list[i]}</a></div><p>`
        }
        
    })
}
function run(){
    videos = document.querySelector('.videos')
    videos.innerHTML = ``   
    video_id = document.getElementsByName('videoId')[0].value
    input = document.getElementsByName('fname')[0].value
    
    fetch(`http://0.0.0.0:8000/${channel_id}/videos/${video_id}/?search=${input}`).then((Response) => {
        return Response.json()
    }).then((data) => {
        json = JSON.stringify(data)
        obj = JSON.parse(json)
        links = obj.data.link
        id = obj.data.id
        msg = obj.data.msg
        time = obj.data.time
        
        for (const i in links) {
            videos.innerHTML = videos.innerHTML + `<div class='chat-${i}'><a href= ${links[i]}>${time[i]} < ${id[i]} > : ${msg[i]}</a></div><p>`
        }

})

}
