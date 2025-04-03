export class WebRTCService {
    constructor(socket) {
      this.socket = socket
      this.peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478' }
        ]
      })
      this.localStream = null
      this.remoteStream = null
  
      // Handle ICE candidates
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.socket.emit('ice-candidate', event.candidate)
        }
      }
  
      // Handle incoming tracks
      this.peerConnection.ontrack = (event) => {
        this.remoteStream = event.streams[0]
      }
    }
  
    async startCall(isVideo) {
      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: isVideo
        })
  
        this.localStream.getTracks().forEach(track => {
          this.peerConnection.addTrack(track, this.localStream)
        })
  
        const offer = await this.peerConnection.createOffer()
        await this.peerConnection.setLocalDescription(offer)
  
        return { localStream: this.localStream, offer }
      } catch (error) {
        console.error('Error starting call:', error)
        throw error
      }
    }
  
    async handleAnswer(answer) {
      try {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
      } catch (error) {
        console.error('Error handling answer:', error)
        throw error
      }
    }
  
    async handleIceCandidate(candidate) {
      try {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
      } catch (error) {
        console.error('Error handling ICE candidate:', error)
        throw error
      }
    }
  
    cleanup() {
      if (this.localStream) {
        this.localStream.getTracks().forEach(track => track.stop())
      }
      if (this.peerConnection) {
        this.peerConnection.close()
      }
    }
  }
  
  