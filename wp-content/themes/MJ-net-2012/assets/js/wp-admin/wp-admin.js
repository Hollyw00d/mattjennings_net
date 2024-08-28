export default class WPAdminUtils {
  init() {
    this.gutenbergEditor();
  }

  gutenbergEditor() {
    // eslint-disable-next-line no-undef
    wp.domReady(() => {
      // eslint-disable-next-line no-prototype-builtins, no-undef
      if (typeof wp === 'undefined' && !wp.hasOwnProperty('blocks')) return;

      // Function to insert a new paragraph block
      function insertParagraphBlock(afterBlockId) {
        // eslint-disable-next-line no-undef
        const blockEditor = wp.data.dispatch('core/block-editor');
        // eslint-disable-next-line no-undef
        const block = wp.blocks.createBlock('core/paragraph');
        // eslint-disable-next-line no-undef
        const index = wp.data
          .select('core/block-editor')
          .getBlockIndex(afterBlockId);
        blockEditor.insertBlock(block, index + 1);
        blockEditor.selectBlock(block.clientId);
      }

      // Delay to ensure virtual DOM elements are loaded
      setTimeout(() => {
        const gutenbergEditor = document.getElementsByClassName(
          'wp-block-post-content'
        );

        for (let i = 0; i < gutenbergEditor.length; i++) {
          const editor = gutenbergEditor[i];

          editor.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              // eslint-disable-next-line no-undef
              const selectedBlock = wp.data
                .select('core/block-editor')
                .getSelectedBlock();
              if (selectedBlock) {
                e.preventDefault();
                insertParagraphBlock(selectedBlock.clientId);
              }
            }
          });
        }
      }, 500);
    });
  }
}
