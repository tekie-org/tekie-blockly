/**
 * Note: This is just a debug playground, 
 * for using useBlockly hook and BlocklyWorkspace Component 
 */
import React from 'react'
import Blockly from 'blockly'
import { BlocklyWorkspace } from './lib';

 const check2 =  {
  name: 'check1',
  category: 'Blocks',
  block: {
    init: function () {
      this.jsonInit({
        "message0": "%1 %2",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "CHECKING",
            "options": [
              [
                "1",
                "1"
              ],
              [
                "2",
                "2"
              ],
              [
                "3",
                "3"
              ]
            ]
          },
          {
            "type": "input_statement",
            "name": "CHECKING",
            "check": "Boolean"
          }
        ],
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
      });
    },
  },
};
  
const App = () => {
  const workspaceConfiguration = {
    readOnly: false,
    grid:{
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: false
        },
    move:{
      scrollbars: {
        horizontal: true,
        vertical: true
      },
      drag: true,
      wheel: true
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 2,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true
    },
    trashcan: true,
  }

  React.useEffect(() => {
    console.log('CHECKING', {Blockly, windowWorkspace: window.OneWorkspace })
  }, [window])

  return (
    <div className="App">
      <div style={{ width: '100%', height: '90vh' }}>
        <div className="header">
          <div className="toolboxHeader headerText">Toolbox</div>
          <div className="workspaceHeader headerText">Workspace</div>
        </div>
        <BlocklyWorkspace
          useDefaultToolbox
          // customTools={[check2]}
          workspaceConfiguration={workspaceConfiguration}
          onWorkspaceChange={(workspace) => {
            // console.log('WORKSAPCE', Blockly.JavaScript.workspaceToCode(workspace))
          }}
          onInject={(e) => {
            console.log('INJECT', e)
          }}
          customTheme={Blockly.Theme.TekiePlayground}
          onXmlChange={(e) => {
            console.log('XML', e)
          }}
          initialXml={''}
          blocklyKey='One'
        />
      </div>
    </div>
  );
}

export default App;
