'use strict';

import vscode = require("vscode");

import ProjectTemplatesPlugin from "../projectTemplatesPlugin";

/**
 * Main command to save the current project as a template.
 * This command can be invoked by the Command Palette or in a folder context menu on the explorer view.
 * @export
 * @param {ProjectTemplatesPlugin} templateManager
 * @param {*} args
 */
export async function run(templateManager: ProjectTemplatesPlugin, args: any) {

	// get workspace folder
	let workspace = await templateManager.selectWorkspace(args);
	if (!workspace) {
		vscode.window.showErrorMessage("No workspace selected");
		return;
	}
	
	// load latest configuration
	templateManager.updateConfiguration(vscode.workspace.getConfiguration('projectTemplates'));

    templateManager.saveAsTemplate(workspace).then(
		(template : string | undefined) => { 
			if (template) {
				vscode.window.showInformationMessage("Saved template '" + template + "'");
			}
		},
		(reason : any) => { 
			vscode.window.showErrorMessage("Failed to save template: " + reason);
		}
	);
    
}