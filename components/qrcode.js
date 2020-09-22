import React, { Component } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import QRCode from 'react-native-qrcode-svg';
// import Share from 'react-native-share';
import { TouchableOpacity } from 'react-native-gesture-handler';

class QR extends Component{

    svg;
    constructor(){
        super();
        this.state={
            size:200,
            ecl:'M',
            color:'black',
            backgroundColor:'white',
            linearGradient:['rgb(255,0,0)','rgb(0,255,255)'],
            enableLinearGradient:false,
            quietZone:0,
            imageSource:require('../assets/logo.png'),
            pdfArr:[]
        };
    }

    // shareQR = async() => {
    //     this.svg.toDataURL(async(data) => {
    //         const shareImageBase64 = {
    //             title:'QR',
    //             message: this.props.value,
    //             url: `data:image/png;base64,${data}`
    //         };

    //         try{
    //             await Share.open(shareImageBase64);
    //         }catch(error){
    //             console.log('Error =>', error);
    //         }
    //     })
    // }

    share = async() => {
        this.svg.toDataURL(async(data) => {
            await Sharing.shareAsync(`data:image/png;base64,${data}`);
        })
    }

    addToArray = async() => {
        this.svg.toDataURL(async(data) => {
            this.setState({
                pdfArr:[...pdfArr,`data:image/png;base64,${data}`]
            })
        })
    }

    render(){
        return(
            <TouchableOpacity onPress={this.share}>
                <QRCode 
                    value={this.props.value}
                    size={this.state.size}
                    color={this.state.color}
                    backgroundColor={this.state.backgroundColor}
                    linearGradient={this.state.linearGradient}
                    enableLinearGradient={this.state.enableLinearGradient}
                    quietZone={this.state.quietZone}
                    getRef={(c) => (this.svg = c)}
                />
            </TouchableOpacity>
        );
    }
}

export default QR;