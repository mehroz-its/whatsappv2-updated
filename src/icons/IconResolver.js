import React from "react";

import DashboardIcon from '@material-ui/icons/Dashboard';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ForumIcon from '@material-ui/icons/Forum';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ContactsIcon from '@material-ui/icons/Contacts';
import SendIcon from '@material-ui/icons/Send';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuIcon from '@material-ui/icons/Menu';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import MicIcon from '@material-ui/icons/Mic';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import CommentIcon from '@material-ui/icons/Comment';
import SettingsIcon from '@material-ui/icons/Settings';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DvrIcon from '@material-ui/icons/Dvr';
import ArrowBack from '@material-ui/icons/ArrowBack';


class IconResolver {
 constructor(){
     this.icons = {
         photo:PhotoCameraIcon,
         remove:RemoveCircleIcon,
         add:PersonAddIcon,
         edit:EditIcon,
         delete:DeleteIcon,
         send:SendIcon,
         search:SearchIcon,
         file:AttachFileIcon,
         more:MoreVertIcon,
         dashboard : DashboardIcon,
         chat : ChatBubbleIcon,
         conversation : ForumIcon,
         role : SupervisorAccountIcon,
         contact_book : ContactMailIcon,
         contact : ContactsIcon,
         file : FileCopyIcon,
         menu : MenuIcon,
         dtick_outline: DoneOutlineIcon,
         cancel: CancelIcon,
         mic: MicIcon,
         forward: ArrowForwardIosIcon,
         group: SpeakerGroupIcon,
         comment: CommentIcon,
         reports: VerticalSplitIcon,
         default: DashboardIcon,
         gallery: AllInboxIcon,
         settings: SettingsIcon,
         campaigns: EventNoteIcon,
         logs: DvrIcon,
         back: ArrowBack
     }
 }
    resolve(name) {
        const _icon = (!this.icons[name]) ? this.icons['default'] : this.icons[name];

        const uid = new Date().getTime();
        
        return(<_icon key={`resolved_icon_${uid}_${name}`}/>);
    }
}

export default new IconResolver;