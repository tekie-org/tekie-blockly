import React from 'react';
import Blockly from 'blockly';
import debounce from './utils/debounce';
import config from './utils/defaultConfig'
import TOOLBOX_JSON from './CustomToolboxJSON';
import { importFromXml, initCustomTools, buildToolboxJSON } from './utils'

/**
 * Custom Category & Theme For Blockly
 */
import './customMethods/customCategory'
import './customMethods/customTheme'

/**
 * Overide Blockly's Toolbox & Workspace Styles
 */
import './customStyle.scss'

/**
 * ~ Blockly React Hook
 * @param ref Workspace Div Reference
 * @param initialXml Initial Blocks to show in workpace (This have to be in XML format)
 * @param toolboxConfiguration toolbox configuration from blockly's official documentation 
 * @param workspaceConfiguration self explanatory refer: https://developers.google.com/blockly/guides/configure/web/configuration_struct
 * @param customTools custom toolbox configration, format -> { name, category, block, generator }
 * @param customTheme self explanatory 
 * @param onWorkspaceChange self explanatory 
 * @param onImportXmlError
 * @param onInject
 * @param onDispose
 * @param useDefaultToolbox
 * @param toolboxMode - default |
 * @returns [ xml, workspace ]
 */
const useBlockly = ({
  ref,
  initialXml,
  toolboxConfiguration,
  workspaceConfiguration = {
    readOnly: false
  },
  onWorkspaceChange = () => {},
  onImportXmlError = () => {},
  onInject = () => {},
  onDispose = () => {},
  customTheme,
  customTools = [],
  useDefaultToolbox = false,
  toolboxMode = null,
}) => {
  const [workspace, setWorkspace] = React.useState(null);
  const [xml, setXml] = React.useState(initialXml);
  const [didInitialImport, setDidInitialImport] = React.useState(false);
  const [didHandleNewWorkspace, setDidHandleNewWorkspace] = React.useState(false);
  workspaceConfiguration = workspaceConfiguration || config.DEFAULT_WORKSPACE_JSON
  toolboxConfiguration = useDefaultToolbox ? TOOLBOX_JSON['default'] : toolboxConfiguration
  toolboxConfiguration = (toolboxMode && TOOLBOX_JSON[toolboxMode]) ? TOOLBOX_JSON[toolboxMode] : toolboxConfiguration 
  const onInjectRef = React.useRef(onInject);
  const onDisposeRef = React.useRef(onDispose);
  const workspaceConfigurationRef = React.useRef(workspaceConfiguration);
  const toolboxConfigurationRef = React.useRef(toolboxConfiguration)

  /** Inject & Dispose ref init */
  React.useEffect(() => {
    onInjectRef.current = onInject;
  }, [onInject]);
  React.useEffect(() => {
    onDisposeRef.current = onDispose;
  }, [onDispose]);

  /** Update Workspace configuration */
  React.useEffect(() => {
    workspaceConfigurationRef.current = workspaceConfiguration;
  }, [workspaceConfiguration]);


  /** 
   * Toolbox configuration can be either a JSON from Blockly's official documentation 
   * i.e @params toolboxConfiguration
   * or it can be array of @params customTools.
  */
  React.useEffect(() => {
    try {
      /** Toolbox will not be initialized is workspace is readOnly */
      if (toolboxConfiguration && workspace) {
        toolboxConfigurationRef.current = toolboxConfiguration;
        workspace.updateToolbox(toolboxConfiguration);
      }
    } catch (e) {
      console.error('From useBlockly ==> ', e)
    }
  }, [toolboxConfiguration, workspace]);

  React.useEffect(() => {
    /** Toolbox will not be initialized is workspace is readOnly */
    try {
      (async () => {
        if (customTools && customTools.length) {
          await initCustomTools(customTools)
          const CustomToolboxJSON = await buildToolboxJSON(customTools)
          if (CustomToolboxJSON && workspace) {
            if (toolboxConfigurationRef.current && toolboxConfigurationRef.current.kind !== CustomToolboxJSON.kind) {
              /** Blockly doesn't support dynamic change of toolbox mode i.e it can be either of kind flyout or category */
              throw new Error('Cannot Change Toolbox Mode')
            } else {
              workspace.updateToolbox(CustomToolboxJSON);
              toolboxConfigurationRef.current = CustomToolboxJSON;
            }
          }
        }
      })()
    } catch (e) {
      console.error('From useBlockly ==> ', e)
    }
  }, [customTools, workspace]);


  /** Trigger when workspace changes helpful in executing code of given blocks */
  const handleWorkspaceChanged = React.useCallback(
    (newWorkspace) => {
      if (onWorkspaceChange) {
        onWorkspaceChange(newWorkspace);
      }
    },
    [onWorkspaceChange]
  );

  /** Initial Workspace Creation */
  React.useEffect(() => {
    const newWorkspace = Blockly.inject(ref.current, {
      ...workspaceConfigurationRef.current,
      toolbox: toolboxConfigurationRef.current,
    });
    setWorkspace(newWorkspace);
    setDidInitialImport(false); // force a re-import if we recreate the workspace
    setDidHandleNewWorkspace(false); // Singal that a workspace change event needs to be sent.
    if (onInjectRef.current && newWorkspace) {
      onInjectRef.current(newWorkspace);
    }

    /** 
     * Dispose of the workspace when our div ref goes away (Equivalent to didComponentUnmount) 
     */
    return () => {
      try {
        newWorkspace.dispose();
        if (onDisposeRef.current) {
          onDisposeFunction(newWorkspace);
        }
      } catch (e) {
        console.error('From useBlockly ==> ', e)
      }
    };
  }, [toolboxConfigurationRef]);

  /** 
   * Send a workspace change event when the workspace is created 
   */
  React.useEffect(() => {
    if (workspace && !didHandleNewWorkspace) {
      handleWorkspaceChanged(workspace);
    }
  }, [handleWorkspaceChanged, didHandleNewWorkspace, workspace]);

  /**
   * Workspace change listener
   */
  React.useEffect(() => {
    if (workspace == null) {
      return undefined;
    }

    const listener = () => {
      handleWorkspaceChanged(workspace);
    };
    workspace.addChangeListener(listener);
    return () => {
      workspace.removeChangeListener(listener);
    };
  }, [workspace, handleWorkspaceChanged]);

  /** 
   * xmlDidChange callback
   */
  React.useEffect(() => {
    if (workspace == null) {
      return undefined;
    }

    const [callback, cancel] = debounce(() => {
      const newXml = Blockly.Xml.domToText(
        Blockly.Xml.workspaceToDom(workspace)
      );
      if (newXml === xml) {
        return;
      }

      setXml(newXml);
    }, 200);

    workspace.addChangeListener(callback);

    return () => {
      workspace.removeChangeListener(callback);
      cancel();
    };
  }, [workspace, xml]);

  /**
   * Custom Blockly Theme
   */
  React.useEffect(() => {
    try {
      const blocklyTheme = customTheme || Blockly.Theme.TekiePrimary
      if (workspace && blocklyTheme) {
        workspace.setTheme(blocklyTheme)
      }
    } catch (e) {
      console.error('From useBlockly ==> ', e)
    }
  }, [customTheme, workspace])

  /**
   * Initial Xml Changes
   */
  React.useEffect(() => {
    if (xml && workspace && !didInitialImport) {
      const success = importFromXml(xml, workspace, onImportXmlError);
      if (!success) {
        setXml(null);
      }
      setDidInitialImport(true);
    }
  }, [xml, workspace, didInitialImport, onImportXmlError]);

  return [ workspace, xml ];
};

export default useBlockly;
