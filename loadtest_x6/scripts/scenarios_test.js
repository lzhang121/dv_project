import http from 'k6/http';
import { check } from 'k6';
const BASE_URL = __ENV.BASE_URL || 'https://default.x6.com';


export let options = {
    scenarios: {
        login: {
            executor: 'constant-vus',
            exec: 'doRegister',
            vus: 100,
            duration: '60s',
        },
        getData: {
            executor: 'ramping-vus',
            exec: 'getUser',
            startVUs: 0,
            stages: [
                { duration: '10s', target: 20 },
                { duration: '10s', target: 20 },
                { duration: '10s', target: 0 },
            ],
        },
    },
};

export function doRegister() {
    const url = `${BASE_URL}/api/auth/register/`;
    const payload = JSON.stringify({
        username: `user02_${__VU}_${__ITER}`, // 避免用户名重复
        password: 'qatest11',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post(url, payload, params);

    check(res, {
        'status is 201': (r) => r.status === 201,
        'status is 400 (user exists)': (r) => r.status === 400,
    });
}

export function getUser() {
    let res = http.get(`${BASE_URL}/api/auth/user/`);
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}
