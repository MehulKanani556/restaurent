import { useEffect, useState } from "react";
import Echo from "laravel-echo";

const useSocket = () => {
    const [echo, setEcho] = useState(null);

    useEffect(() => {
        window.Pusher = require('pusher-js');
        const newEcho = new Echo({
            broadcaster: 'pusher',
            key: "GoofNBCH",
            cluster: "mt1",
            wsHost: window.location.hostname,
            wsPort: 6001,
            forceTLS: false,
            encrypted: false,
            disableStats: true,
        });

        setEcho(newEcho);

        return () => {
            newEcho.disconnect(); // Clean up on unmount
        };
    }, []);

    return echo;
};

export default useSocket;