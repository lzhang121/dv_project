import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://140.150.32.205:5001/';

export let options = {
    vus: 100,
    duration: '60s',
};

export default function () {
    let res = http.get(`${BASE_URL}`);
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}
