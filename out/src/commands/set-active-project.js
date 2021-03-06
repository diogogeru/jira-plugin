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
const decko_1 = require("decko");
const vscode = require("vscode");
const configuration_1 = require("../configuration");
const state_1 = require("../state");
class SetActiveProjectCommand {
    constructor(context) {
        this.id = 'jira-plugin.setActiveProject';
        this.context = context;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield state_1.default.jira.getProjects();
            const picks = projects.map(project => ({
                label: project.key,
                description: project.name
            }));
            const selected = yield vscode.window.showQuickPick(picks, { placeHolder: `Set current project`, matchOnDescription: true });
            configuration_1.setConfigurationByKey(configuration_1.CONFIG.ACTIVE_PROJECT, selected ? selected.label : '');
        });
    }
}
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SetActiveProjectCommand.prototype, "run", null);
exports.SetActiveProjectCommand = SetActiveProjectCommand;
//# sourceMappingURL=set-active-project.js.map