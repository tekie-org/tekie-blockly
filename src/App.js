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
  const [newXml, setNewXML] = React.useState('')
  const [newBlocks, setNewBlocks] = React.useState(check2)
  const workspaceConfiguration = {
    readOnly: false,
    horizontalLayout: true,
    grid: {
      spacing: 20,
      length: 3,
      colour: '#333',
      snap: true
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
    renderer: 'zelos'
  }

  React.useEffect(() => {
    console.log('CHECKINED', {Blockly, windowWorkspace: window.OneWorkspace })
  }, [window])

  return (
    <div className="App">
      <input value={newXml} onChange={(e) => {
        setNewXML(e.target.value)
      }} />
      <input value={JSON.stringify(newBlocks)} onChange={(e) => {
        if (JSON.parse(e.target.value)) {
          setNewBlocks(JSON.parse(e.target.value))
        }
      }} />
      <div style={{ width: '100%', height: '90vh' }}>
        <BlocklyWorkspace
          shouldUpdateXML
          useDefaultToolbox
          customTools={[newBlocks]}
          workspaceConfiguration={workspaceConfiguration}
          onWorkspaceChange={(workspace) => {
            // console.log('WORKSAPCE', Blockly.JavaScript.workspaceToCode(workspace))
          }}
          onInject={(e) => {
            console.log('INJECT', e)
          }}
          onXmlChange={(e) => {
            console.log('XML', e)
          }}
          initialXml={newXml || ''}
          blocklyKey='One'
        />
      </div>
    </div>
  );
}

export default App;
