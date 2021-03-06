import * as vscode from 'vscode';
import { IWorkingIssue } from '../http/api.model';
import state, { incrementStateWorkingIssueTimePerSecond } from '../state/state';
import { getConfigurationByKey, getGlobalWorkingIssue, setGlobalWorkingIssue } from './configuration';
import { CONFIG, NO_WORKING_ISSUE } from './constants';
import { secondsToHHMMSS } from './utilities';

export class StatusBarManager {
  private workingProjectItem: vscode.StatusBarItem;
  private workingIssueItem: vscode.StatusBarItem;
  private intervalId: NodeJS.Timer | undefined;

  constructor() {
    this.workingIssueItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    this.workingProjectItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 200);
  }

  public async updateWorkingProjectItem(project: string): Promise<void> {
    if (!state.jira) {
      return;
    }
    if (!project) {
      project = (await getConfigurationByKey(CONFIG.WORKING_PROJECT)) || '';
    }
    this.workingProjectItem.tooltip = 'Set working project';
    this.workingProjectItem.command = 'jira-plugin.setWorkingProjectCommand';
    this.workingProjectItem.text = `$(clippy) ` + (!!project ? `Project: ${project}` : `Project: NONE`);
    this.workingProjectItem.show();
    if (getConfigurationByKey(CONFIG.ENABLE_WORKING_ISSUE)) {
      this.updateWorkingIssueItem(true);
    }
  }

  private workingIssueItemText(workingIssue: IWorkingIssue): string {
    return (
      `$(watch) ` + (workingIssue.issue.key !== NO_WORKING_ISSUE.key ? `Working Issue: - ${workingIssue.issue.key || ''} ${secondsToHHMMSS(workingIssue.timePerSecond) || ''}` : NO_WORKING_ISSUE.text)
    );
  }

  public updateWorkingIssueItem(checkGlobalStore: boolean): void {
    let issue;
    if (checkGlobalStore) {
      issue = getGlobalWorkingIssue(state.context);
      if (!!issue) {
        vscode.commands.executeCommand('jira-plugin.setWorkingIssueCommand', JSON.parse(issue));
        setGlobalWorkingIssue(state.context, undefined);
        return;
      }
    }

    this.clearWorkingIssueInterval();
    if (state.workingIssue.issue.key !== NO_WORKING_ISSUE.key) {
      this.startWorkingIssueInterval();
    } else {
      setGlobalWorkingIssue(state.context, undefined);
    }
    this.workingIssueItem.text = this.workingIssueItemText(state.workingIssue);
    this.workingIssueItem.tooltip = 'Set working issue';
    this.workingIssueItem.command = 'jira-plugin.setWorkingIssueCommand';
    this.workingIssueItem.show();
  }

  public clearWorkingIssueInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  public startWorkingIssueInterval(): void {
    this.clearWorkingIssueInterval();
    this.intervalId = setInterval(() => {
      if (vscode.window.state.focused) {
        incrementStateWorkingIssueTimePerSecond();
        this.workingIssueItem.text = this.workingIssueItemText(state.workingIssue);
      }
    }, 1000);
  }

  public async dispose(): Promise<void> {
    this.clearWorkingIssueInterval();
    this.workingIssueItem.dispose();
    this.workingProjectItem.dispose();
  }
}
