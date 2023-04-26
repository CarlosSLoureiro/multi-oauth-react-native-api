export default class LoginService {
    constructor(
        private readonly userRepository: string = 'test'
    ) {}

    public async doLogin() {
        const data = {
            token: `${this.userRepository} example`
        };

        return Promise.resolve(data);
    }
};