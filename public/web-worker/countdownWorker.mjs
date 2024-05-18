{
    let countdown;
    let timer;

    self.onmessage = event => {
        switch (event.data.type) {
            case 'start':
                countdown = event.data.seconds;
                timer = setInterval(() => {
                    countdown--;
                    postMessage({type: 'tick', remaining: countdown});
                    if (countdown <= 0) {
                        clearInterval(timer);
                        postMessage({type: 'done'});
                    }
                }, 1000);
                break;
            case 'stop':
                if (timer) {
                    clearInterval(timer);
                }
                break;
        }
    };
}