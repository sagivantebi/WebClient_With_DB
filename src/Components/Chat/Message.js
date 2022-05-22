export default function Message(props) {

    if (props.sent == false) {
      return (
        <div class="row no-gutters" >
          <div class="col-md-auto">
            <div class="chat-bubble--left">
              <div>{props.content}</div>
              <small>{props.time}</small>
            </div>

          </div>
        </div>
      );
    } else {
      return (
        <div class="row no-gutters">
          <div>
            <div class="chat-bubble--right">
              <div>{props.content}</div>
              <small>{props.time.substr(5, 10)}</small>
            </div>
          </div>
        </div>
      );
    }
  // } else if(props.type == "image/jpeg" || props.type == "image/png") {
  //   if (props.side == "left") {
  //     return (
  //       <div class="row no-gutters">
  //         <div class="col-md-auto">
  //           <div style={{maxWidth: "30%"}} class="chat-bubble--left">
  //             <img className="image-container"src={props.content}/>
  //             <small>{props.time.substr(0, 5)}</small>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div class="row justify-content-end ml-auto">
  //         <div class="col-auto">
  //         <div class="chat-bubble--right">
  //           <img style={{maxWidth: "30%"}} className="image-container" src={props.content} alt="preview"/>
  //           <br/> 
  //           <small>{props.time.substr(0, 5)}</small>
  //           </div>
            
  //         </div>
  //       </div>
  //     );
  //   }
  // } else if(props.type == "audio") {
  //   if (props.side == "left") {
  //     return (
  //       <div class="row no-gutters">
  //         <div class="col-md-auto">
  //           <div class="chat-bubble--left">
  //           <audio className="image-container" controls >
  //           <source  src={props.content} type={props.content.type}></source>
  //           </audio> <br />
  //           <small>{props.time.substr(0, 5)}</small>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div class="row justify-content-end ml-auto">
  //         <div class="col-md-auto offset-md-6">
  //         <div class="chat-bubble--right">
  //           <audio className="image-container" controls >
  //           <source  src={props.content} type={props.content.type}></source>
  //           </audio> <br />
  //           <small>{props.time.substr(0, 5)}</small>
  //           </div>
            
  //         </div>
  //       </div>
  //     );
  //   }
  // } else if (props.type == 'video/mp4') {
  //   if (props.side == "left") {
  //     return (
  //       <div class="row no-gutters">
  //         <div class="col-md-auto">
  //           <div class="chat-bubble--left">
  //             <video className="image-container" src={props.content} controls/>
  //             <small>{props.time.substr(0, 5)}</small>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div class="row justify-content-end ml-auto">
  //         <div class="col-auto">
  //         <div class="chat-bubble--right">
  //           <video className="image-container" src={props.content} controls/>
  //           <br/> 
  //           <small>{props.time.substr(0, 5)}</small>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  // }
  
   return null;
}
