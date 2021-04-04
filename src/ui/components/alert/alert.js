import {React, useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import './alert.css'

import EventEmitter from '../../hooks/event-manager';

const AlertBanner = (props) => {

    const [alertData, setalertData] = useState("Success!");

    EventEmitter.addListener('alert', (data) => {
        setalertData(data);

        document.getElementById('alertBanner').setAttribute("style", "display: flex !important");
        
        setTimeout(() => 
        { 
            
            document.getElementById('alertBanner').setAttribute("style", "display: none !important");

        }, 1500);
    });
    
    return (
        <div className='alert-wrapper' id="alertBanner">
            <section>
                <Alert className="alert-container" severity="info" onClose={() => {document.getElementById('alertBanner').setAttribute("style", "display: none !important");}}>{alertData}</Alert>
            </section>
        </div>
    )
}

export default AlertBanner;
