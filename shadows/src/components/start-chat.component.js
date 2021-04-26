
import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import Peer from 'peerjs';


export default class StartChat extends Component {
  constructor(props) {
    super(props);
    const peer = new Peer("sender", {
      debug: 2
    });
    this.state = {
      id: "sender",
      peer: peer,
      messages: []
    };
    // axios.post('http://localhost:5000/', post)
  }

  onSubmit(){
    
  }

  onClearLogs(){

  }

  render() {
    return (
    <div>
        <table className="display">
          <tbody>
          <tr>
                <td className="title">Status:</td>
                <td className="title">Messages:</td>
            </tr>
            <tr>
                <td>
                    <div id="receiver-id" style={{fontWeight: "bold"}} title="Copy this ID to the input on send.html.">ID:</div>
                </td>
                <td>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <input  type="text"
                      required
                      className="form-control"
                      value={this.state.message}
                      onChange={this.onChangeMessage}
                      />
                      <input type="submit" value="Send Message" className="btn btn-primary" />
                      <button type="button" onClick={() => this.onClearLogs()}>Clear Msgs (Local)</button>
                    </div>
                  </form>
                </td>
            </tr>
            <tr>
                <td><div id="status" className="status"></div></td>
                <td><div className="message" id="message"></div></td>
            </tr>
          </tbody>
        </table>

        {/* <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>
        <script type="text/javascript">
            (function () {
                var lastPeerId = null;
                var peer = null; // Own peer object
                var peerId = null;
                var conn = null;
                var recvId = document.getElementById("receiver-id");
                var status = document.getElementById("status");
                var message = document.getElementById("message");
                var standbyBox = document.getElementById("standby");
                var goBox = document.getElementById("go");
                var fadeBox = document.getElementById("fade");
                var offBox = document.getElementById("off");
                var sendMessageBox = document.getElementById("sendMessageBox");
                var sendButton = document.getElementById("sendButton");
                var clearMsgsButton = document.getElementById("clearMsgsButton");

                 function initialize() {
                    // Create own peer object with connection to shared PeerJS server
                    peer = new Peer(null, {
                        debug: 2
                    });

                    peer.on('open', function (id) {
                        // Workaround for peer.reconnect deleting previous id
                        if (peer.id === null) {
                            console.log('Received null id from peer open');
                            peer.id = lastPeerId;
                        } else {
                            lastPeerId = peer.id;
                        }

                        console.log('ID: ' + peer.id);
                        recvId.innerHTML = "ID: " + peer.id;
                        status.innerHTML = "Awaiting connection...";
                    });
                    peer.on('connection', function (c) {
                        // Allow only a single connection
                        if (conn && conn.open) {
                            c.on('open', function() {
                                c.send("Already connected to another client");
                                setTimeout(function() { c.close(); }, 500);
                            });
                            return;
                        }

                        conn = c;
                        console.log("Connected to: " + conn.peer);
                        status.innerHTML = "Connected";
                        ready();
                    });
                    peer.on('disconnected', function () {
                        status.innerHTML = "Connection lost. Please reconnect";
                        console.log('Connection lost. Please reconnect');

                        // Workaround for peer.reconnect deleting previous id
                        peer.id = lastPeerId;
                        peer._lastServerId = lastPeerId;
                        peer.reconnect();
                    });
                    peer.on('close', function() {
                        conn = null;
                        status.innerHTML = "Connection destroyed. Please refresh";
                        console.log('Connection destroyed');
                    });
                    peer.on('error', function (err) {
                        console.log(err);
                        alert('' + err);
                    });
                };

                function ready() {
                    conn.on('data', function (data) {
                        console.log("Data recieved");
                        var cueString = "<span class=\"cueMsg\">Cue: </span>";
                        switch (data) {
                            case 'Go':
                                go();
                                addMessage(cueString + data);
                                break;
                            case 'Fade':
                                fade();
                                addMessage(cueString + data);
                                break;
                            case 'Off':
                                off();
                                addMessage(cueString + data);
                                break;
                            case 'Reset':
                                reset();
                                addMessage(cueString + data);
                                break;
                            default:
                                addMessage("<span class=\"peerMsg\">Peer: </span>" + data);
                                break;
                        };
                    });
                    conn.on('close', function () {
                        status.innerHTML = "Connection reset<br>Awaiting connection...";
                        conn = null;
                    });
                }

                function go() {
                    standbyBox.className = "display-box hidden";
                    goBox.className = "display-box go";
                    fadeBox.className = "display-box hidden";
                    offBox.className = "display-box hidden";
                    return;
                };

                function fade() {
                    standbyBox.className = "display-box hidden";
                    goBox.className = "display-box hidden";
                    fadeBox.className = "display-box fade";
                    offBox.className = "display-box hidden";
                    return;
                };

                function off() {
                    standbyBox.className = "display-box hidden";
                    goBox.className = "display-box hidden";
                    fadeBox.className = "display-box hidden";
                    offBox.className = "display-box off";
                    return;
                }

                function reset() {
                    standbyBox.className = "display-box standby";
                    goBox.className = "display-box hidden";
                    fadeBox.className = "display-box hidden";
                    offBox.className = "display-box hidden";
                    return;
                };

                function addMessage(msg) {
                    var now = new Date();
                    var h = now.getHours();
                    var m = addZero(now.getMinutes());
                    var s = addZero(now.getSeconds());

                    if (h > 12)
                        h -= 12;
                    else if (h === 0)
                        h = 12;

                    function addZero(t) {
                        if (t < 10)
                            t = "0" + t;
                        return t;
                    };

                    message.innerHTML = "<br><span class=\"msg-time\">" + h + ":" + m + ":" + s + "</span>  -  " + msg + message.innerHTML;
                }

                function clearMessages() {
                    message.innerHTML = "";
                    addMessage("Msgs cleared");
                }

                // Listen for enter in message box
                sendMessageBox.addEventListener('keypress', function (e) {
                    var event = e || window.event;
                    var char = event.which || event.keyCode;
                    if (char == '13')
                        sendButton.click();
                });
                // Send message
                sendButton.addEventListener('click', function () {
                    if (conn && conn.open) {
                        var msg = sendMessageBox.value;
                        sendMessageBox.value = "";
                        conn.send(msg);
                        console.log("Sent: " + msg)
                        addMessage("<span class=\"selfMsg\">Self: </span>" + msg);
                    } else {
                        console.log('Connection is closed');
                    }
                });

                // Clear messages box
                clearMsgsButton.addEventListener('click', clearMessages);

                initialize();
            })();
        </script> */}
    </div>
    )
  }
}
