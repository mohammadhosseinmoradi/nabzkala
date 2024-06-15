import _Tab from "./tab";
import Group from "./group";
import List from "./list";
import Panels from "./panels";
import Panel from "./panel";

const Tab = Object.assign(_Tab, {
  Group,
  List,
  Panels,
  Panel,
});

export default Tab;

/**
 *
 * Examples of use:
 *
 * #1: Simple use
 *
 *          <ScrollspyTab.Group>
 *             <ScrollspyTab.List className='top-0'>
 *                 <ScrollspyTab>A</ScrollspyTab>
 *                 <ScrollspyTab>B</ScrollspyTab>
 *                 <ScrollspyTab>C</ScrollspyTab>
 *             </ScrollspyTab.List>
 *             <ScrollspyTab.Panels>
 *                 <ScrollspyTab.Panel>
 *                   This is a content for A tab.
 *                 </ScrollspyTab.Panel>
 *                 <ScrollspyTab.Panel>
 *                   This is a content for B tab.
 *                 </ScrollspyTab.Panel>
 *                 <ScrollspyTab.Panel>
 *                   This is a content for C tab.
 *                 </ScrollspyTab.Panel>
 *             </ScrollspyTab.Panels>
 *         </ScrollspyTab.Group>
 *
 *
 * #2: With threshold, offsetTop and dynamic calculation top value.
 * threshold: Number between 0 and 1 indicating the percentage that should be visible before triggering. Can also be an array of numbers, to create multiple trigger points.
 * offsetTop: Offset top from the root.
 *
 *          <ScrollspyTab.Group marginTop={-100} threshold={0.1} offsetTop={50}>
 *             <ScrollspyTab.List style={{
 *               top: "Dynamic calculated top value".
 *             }}>
 *                 <ScrollspyTab>A</ScrollspyTab>
 *                 <ScrollspyTab>B</ScrollspyTab>
 *                 <ScrollspyTab>C</ScrollspyTab>
 *             </ScrollspyTab.List>
 *             <ScrollspyTab.Panels>
 *                 <ScrollspyTab.Panel>
 *                   This is a content for A tab.
 *                 </ScrollspyTab.Panel>
 *                 <ScrollspyTab.Panel>
 *                   This is a content for B tab.
 *                 </ScrollspyTab.Panel>
 *                 <ScrollspyTab.Panel>
 *                   This is a content for C tab.
 *                 </ScrollspyTab.Panel>
 *             </ScrollspyTab.Panels>
 *         </ScrollspyTab.Group>
 */
