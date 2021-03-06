"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const constants_1 = require("../../shared/constants");
const utilities_1 = require("../../shared/utilities");
class DividerItem extends vscode.TreeItem {
    constructor() {
        super('------', vscode.TreeItemCollapsibleState.None);
        this.iconPath = {
            light: utilities_1.getIconsPath(`light/${constants_1.DIVIDER.file}`),
            dark: utilities_1.getIconsPath(`dark/${constants_1.DIVIDER.file}`)
        };
        this.contextValue = 'DividerItem';
    }
    get tooltip() {
        return '';
    }
}
exports.DividerItem = DividerItem;
//# sourceMappingURL=divider-item.js.map