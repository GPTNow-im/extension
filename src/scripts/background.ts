export {};

// chrome.storage.local.get(['isFirst'], async function (data) {
//   if (!data.isFirst) {
//     chrome.tabs.create({
//       url: 'dashboard/index.html',
//     });
//     chrome.storage.local.set({ isFirst: true });
//   }
// });
// chrome.contextMenus.create(
//   {
//     type: 'normal',
//     title: 'ChatGPT Anywhere',
//     id: 'chatGPTAnywhere',
//     contexts: ['selection'],
//   },
//   function () {
//     console.log('contextMenus are create.');
//   },
// );
// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//   const text = info.selectionText;
//   if (tab?.id) {
//     chrome.tabs.sendMessage(tab.id, { text }, function (response) {
//       console.log(response);
//     });
//   }
// });
