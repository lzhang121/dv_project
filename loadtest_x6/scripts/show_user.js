import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://default.x6.com';

export let options = {
    vus: 10,
    duration: '60s',
};

export default function () {
    let res = http.get(`${BASE_URL}/api/auth/user/`);
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}
