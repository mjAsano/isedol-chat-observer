# isedol-chat-observer

*This project is made for list-up and watch specific channels.
The code defines a number of functions that can be used to interact with a server to fetch video data.


## The `change_channel` function
The change_channel function takes a channel ID as an argument and sets the channel_id variable to the given value. Here's what the function looks like:

```javascript
function change_channel(id) {
    channel_id = id
    document.getElementsByName('name')[0].value = channel_id
    read_video_list()
}
```
The function first sets the channel_id variable to the value of the id argument. Then it sets the value property of the first element with the name name in the document to the value of channel_id. Finally, it calls the read_video_list function.

## The `read_video_list` function
The read_video_list function fetches a list of videos for the current channel_id and displays them on the page. Here's what the function looks like:
```javascript
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
```
The function first sets the videos variable to the element with the video_list class in the document. Then it sets the innerHTML property of videos to an empty string. This effectively clears the videos element.

Next, the function uses the fetch API to send a request to the server at http://0.0.0.0:8000/videos/ with the current channel_id appended to the URL. The fetch API returns a Promise object, so the function uses then and an arrow function to handle the response from the server. The response is expected to be in JSON format, so the function uses the json method of the Response object to parse the JSON data.

Once the JSON data is parsed, the function creates a json variable and sets it to the stringified version of the data. It then creates an obj variable and sets it to the result of parsing the json string. Finally, it sets the list variable to the list property of obj, which should be an array of video names.

The function then logs the list array to the console and loops through it using a for...in loop. For each item in the list, the function appends a <div> element containing the video name to the videos element.
  
## The `run` function
The run function is similar to the read_video_list function, but it fetches the chat data for a specific video and displays the chat messages on the page. Here's what the function looks like:
  
```javascript
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
```
The function first sets the videos variable to the element with the videos class in the document. Then it sets the innerHTML property of videos to an empty string. This effectively clears the videos element.

Next, the function sets the video_id and input variables to the value properties of the first elements with the names videoId and fname, respectively, in the document.

Then, the function uses the fetch API to send a request to the server at http://0.0.0.0:8000/ with the current channel_id and video_id appended to the URL, along with a query parameter named search that is set to the value of the input variable. The fetch API returns a Promise object, so the function uses then and an arrow function to handle the response from the server. The response is expected to be in JSON format, so the function uses the json method of the Response object to parse the JSON data.

Once the JSON data is parsed, the function creates a json variable and sets it to the stringified version of the data. It then creates an obj variable and sets it to the result of parsing the json string. Finally, it sets the links, id, msg, and time variables to the corresponding properties of the data property of obj.

The function then loops through the links array using a for...in loop. For each item in the array, the function appends a <div> element containing the chat message data to the videos element.

That's a high-level overview of the code. Let me know if you have any questions or need further clarification on any of the concepts or details.

## Conclusion
In conclusion, the code defines a number of functions that can be used to interact with a server to fetch video data. The change_channel function takes a channel ID as an argument and sets the channel_id variable to the given value. The read_video_list function fetches a list of videos for the current channel_id and displays them on the page. The run function is similar, but it fetches the chat data for a specific video and displays the chat messages on the page. Together, these functions allow users to view and search for videos on the specified channel.

## Issues
1. The channel_id variable is defined outside of the change_channel() function, which means it is in the global scope. This could cause problems if the change_channel() function is called from multiple places, as it could overwrite the value of channel_id that other parts of the code are using.

2. The read_video_list() function is using the fetch() method to make an HTTP request to a server at the URL http://0.0.0.0:8000/videos/{channel_id}/. This URL may not be correct, and the server may not be responding, which could cause the function to fail.

3. The run() function is using the fetch() method to make an HTTP request to a server at the URL http://0.0.0.0:8000/{channel_id}/videos/{video_id}/?search={input}. This URL may not be correct, and the server may not be responding, which could cause the function to fail.

4. In the for loop in the run() function, the variable i is used to index into the links, id, msg, and time arrays. However, i is declared as a const, which means its value cannot be changed. This could cause the loop to fail if the arrays do not have the same number of elements.

5. In the for loop in the read_video_list() function, the variable i is used to index into the list array. However, i is declared as a const, which means its value cannot be changed. This could cause the loop to fail if the list array does not have the same number of elements as the list array in the read_video_list() function.
