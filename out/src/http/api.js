"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("pretend/dist/src");
exports.createClient = (endpoint, username, password) => {
    return src_1.Pretend.builder()
        .interceptor(impl.logger())
        .basicAuthentication(username, password)
        .requestInterceptor(impl.contentType())
        .decode(impl.decoder())
        .target(impl.JiraBlueprint, endpoint);
};
var impl;
(function (impl) {
    impl.logger = () => {
        return (chain, request) => __awaiter(this, void 0, void 0, function* () {
            // console.log('request: ', request);
            const response = yield chain(request);
            // console.log('response', response);
            return response;
        });
    };
    impl.contentType = () => {
        return request => {
            request.options.headers.set('Content-Type', 'application/json');
            return request;
        };
    };
    impl.decoder = () => {
        return response => {
            if (response.status === 204) {
                // no-content
                return Promise.resolve();
            }
            return response.json();
        };
    };
    class JiraBlueprint {
        serverInfo() {
            /* */
        }
        getStatuses() {
            /* */
        }
        search() {
            /* */
        }
        getProjects() {
            /* */
        }
        getTransitions() {
            /* */
        }
        doTransition() {
            /* */
        }
        getAssignees() {
            /* */
        }
        assignIssue() {
            /* */
        }
        addNewComment() {
            /* */
        }
        addWorkLog() {
            /* */
        }
    }
    __decorate([
        src_1.Get('/rest/api/2/serverInfo'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], JiraBlueprint.prototype, "serverInfo", null);
    __decorate([
        src_1.Get('/rest/api/latest/status'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], JiraBlueprint.prototype, "getStatuses", null);
    __decorate([
        src_1.Post('/rest/api/2/search'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], JiraBlueprint.prototype, "search", null);
    __decorate([
        src_1.Get('/rest/api/2/project'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], JiraBlueprint.prototype, "getProjects", null);
    __decorate([
        src_1.Get('/rest/api/2/issue/:issue/transitions'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], JiraBlueprint.prototype, "getTransitions", null);
    __decorate([
        src_1.Post('/rest/api/2/issue/:issue/transitions'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], JiraBlueprint.prototype, "doTransition", null);
    __decorate([
        src_1.Get('/rest/api/2/user/assignable/:param'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], JiraBlueprint.prototype, "getAssignees", null);
    __decorate([
        src_1.Put('/rest/api/2/issue/:issue/assignee'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], JiraBlueprint.prototype, "assignIssue", null);
    __decorate([
        src_1.Post('/rest/api/2/issue/:issue/comment'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], JiraBlueprint.prototype, "addNewComment", null);
    __decorate([
        src_1.Post('/rest/api/2/issue/:issue/worklog'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], JiraBlueprint.prototype, "addWorkLog", null);
    impl.JiraBlueprint = JiraBlueprint;
})(impl || (impl = {}));
//# sourceMappingURL=api.js.map