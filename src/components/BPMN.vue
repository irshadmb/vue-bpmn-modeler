<!--
  This Vue file represents the BPMN component.
  It contains the BPMN modeler functionality for designing and managing BPMN diagrams.
  
  Author: Irshad Ahamed.M.B
  License: MIT
-->
<template>
    <div ref="container" class="containers">
      <div ref="canvas" class="canvas"></div>
      <div id="properties-panel-parent" class="properties-panel-parent">
      </div>     
      <div class="button-container">
            <button class="buttons"  @click="downloadBpmn">Download BPMN</button>
            <button class="buttons"  @click="downloadSvg">Download SVG</button>
        </div>
    </div>
  </template>
  
  <script>

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '@bpmn-io/properties-panel/assets/properties-panel.css';
import 'bpmn-js-color-picker/colors/color-picker.css';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';

import BpmnModeler from 'bpmn-js/lib/Modeler';
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule
} from 'bpmn-js-properties-panel';
import BpmnColorPickerModule from 'bpmn-js-color-picker';
import { debounce } from 'min-dash';
import {
  ElementTemplatesPropertiesProviderModule // Camunda 7 Element Templates
} from 'bpmn-js-element-templates';

import minimapModule from 'diagram-js-minimap';

import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json';
  
  export default {
    name: "BPMN",
    props: {
      diagramXML: String,
      propertiesPanel: null
    },
  /**
   * Initializes the data properties for the component.
   *
   * @return {Object} - An object containing the initial values for the data properties.
   */
    data() {
      return {
        modeler: {},
        xmlData: "",
        svgImage: "",
        isSvg: false,
      };
    },
    watch: {
      diagramXML(val) {
        this.openDiagram(val)
      }
    },
    /**
     * Initializes the BPMN modeler on component mount, loads the diagramXML, and sets up export artifacts functionality.
     *
     */
    async mounted() {
      console.log(this.propertiesPanel === '')
      let canvas = this.$refs["canvas"];
      
      
      this.modeler = new BpmnModeler({
        container: canvas,
        propertiesPanel: {
            parent: '#properties-panel-parent'
        },
        additionalModules: [
            BpmnColorPickerModule,
            BpmnPropertiesPanelModule,
            BpmnPropertiesProviderModule,
            ElementTemplatesPropertiesProviderModule,
            minimapModule
        ],
        moddleExtensions: {
            camunda: CamundaBpmnModdle
        },
        keyboard: {
            bindTo: window
        }
      });


      await this.openDiagram(this.diagramXML).then(() => {
        
        let _self = this;
        let exportArtifacts = debounce(async () => {
          try {
            const { svg } = await _self.modeler.saveSVG();
            _self.svgImage = svg;  
          } catch (err) {
            console.log(`saveSVG error `+err)
          }
          try {
            const { xml } = await _self.modeler.saveXML({ format: true })
            _self.xmlData = xml;  
          } catch (error) {
            console.log(`saveXML error `+error)
          }
          let modelInfo = {
            xmlData: _self.xmlData,
            svgImage: _self.svgImage
          }
          _self.$emit('input', modelInfo)
        }, 10);
        this.modeler.on("commandStack.changed", exportArtifacts);
        exportArtifacts()
      });
    },
    methods: {
        /**
         * Downloads the SVG image of the BPMN diagram as a file.
         *
         * @return {void} This function does not return anything.
         */
        downloadSvg() {
            this.isSvg = true;

            // Create a blob from the SVG string
            const blob = new Blob([this.svgImage], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);

            // Create a temporary link element and trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = 'bpmn_image.svg';
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            },
  
        /**
         * Downloads the BPMN XML data as a file.
         *
         * @return {void} This function does not return anything.
         */
            downloadBpmn() {
            this.isBpmn = true;

            // Create a blob from the XML string
            const blob = new Blob([this.xmlData], { type: 'text/xml' });
            const url = URL.createObjectURL(blob);

            // Create a temporary link element and trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = 'bpmn_export.bpmn';
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            },
     
    /**
     * Opens a diagram using the provided XML data.
     *
     * @param {string} xml - The XML data representing the diagram.
     * @return {Promise} A promise that resolves when the diagram is successfully opened, or rejects with an error.
     */
      openDiagram(xml) {
      return new Promise((resolve, reject) => {
        if (xml) {
          this.modeler.importXML(xml)
            .then(() => {
              console.log('rendered');
              this.xmlData = xml;
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        } else {
          this.modeler.createDiagram();
          setTimeout(() => {
            let modelerCanvas = this.modeler.get("canvas");
            let rootElement = modelerCanvas.getRootElement();
            let modeling = this.modeler.get("modeling");
            
            rootElement.children.forEach(n => {
              if (n.type === 'bpmn:StartEvent') {
                modeling.updateProperties(n, {
                  name: 'Start',
                });
              } else if (n.type === 'bpmn:EndEvent') {
                modeling.updateProperties(n, {
                  name: 'End',
                });
              }
            });

        resolve();
      });
    }
  });
},
    /**
     * Saves the SVG image of the BPMN diagram.
     *
     * @param {function} done - A callback function to be called when the SVG is saved.
     * @return {void}
     */
      saveSVG(done) {
        this.modeler.saveSVG(done);
      },
      // todo 
      focusOut(event) {
        let layerBase = document.querySelector('.layer-base')
        let zoom = layerBase.parentNode.getBoundingClientRect();
        if (event.pageX < zoom.left || event.pageX > (zoom.left + zoom.width + 100) || event.pageY < zoom.top || event.pageY > (zoom.top + zoom.height + 40)) {         
          let directEditing = this.modeler.injector.get('directEditing', false);
          directEditing.complete()
          let eventBus = this.modeler.injector.get('eventBus', false);
          eventBus.fire('element.click', '')
        }
      }
    }
  };
  </script>


  <style lang="less" scoped>
  @import "~bpmn-js/dist/assets/diagram-js.css";
  @import "~bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
  @import "~diagram-js-minimap/assets/diagram-js-minimap.css";
  
  .containers {
    position: absolute;
    background-color: #ffffff;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .canvas {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, #bbbbbb, transparent 1px);
  background-size: 10px 10px; /* Adjust the size of the dots */
}

.djs-minimap {
  top: 54px;
  right: 40px;
}

  .properties-panel-parent {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 12px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 260px;
    z-index: 10;
    border-left: 1px solid #ccc;
    overflow: auto;
    &:empty {
      display: none;
    }
    > .djs-properties-panel {
      padding-bottom: 70px;
      min-height:100%;
    }
    /deep/ .bpp-textfield input {
      padding-right: 0;
    }
    /deep/ .bpp-properties-panel {
      .bpp-properties {
        .bpp-properties-header {
          .label {
              word-wrap: break-word;
          }
        }
      }
    }
    /deep/ .bpp-properties-panel [type=text], /deep/ .bpp-properties-panel textarea {
      width: calc(100% - 6px)
    }
    /deep/ .bpp-properties-panel [contenteditable] {
      width: calc(100% - 12px)
    }
    /deep/ .bpp-table-row > label.bpp-table-row-columns-2.bpp-table-row-removable, /deep/ .bpp-table-row > input.bpp-table-row-columns-2.bpp-table-row-removable {
      width: calc(50% - 12px);
    }
  }

  

  .button-container {
    position: absolute;
  display: flex;
  justify-content: flex-end;
  bottom: 2%;
}

  .buttons {
  background-color: #4fdb82;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: 'CerebriSans-Regular', -apple-system, system-ui, Roboto, sans-serif;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 0;
  font-size: 14px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 20px;
}

.buttons:hover {
  background-color: #3ec971;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
}

.buttons a {
  color: inherit;
  text-decoration: none;
}

.buttons a:hover, 
.buttons a:visited, 
.buttons a:active {
  color: inherit;
  text-decoration: none;
}



  </style>