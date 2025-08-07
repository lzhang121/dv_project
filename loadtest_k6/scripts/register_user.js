import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://default.x6.com';

export let options = {
    vus: 10, // 并发用户数
    duration: '10s', // 压测持续时间
};

export default function () {
    const url = `${BASE_URL}/api/auth/register/`;
    const payload = JSON.stringify({
        username: `user_${__VU}_${__ITER}`, // 避免用户名重复
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
