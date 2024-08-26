document.addEventListener('DOMContentLoaded', () => {
  console.log('script ran');

  // Function to insert a new paragraph block
  function insertParagraphBlock(afterBlockId) {
    const blockEditor = wp.data.dispatch('core/block-editor');
    const block = wp.blocks.createBlock('core/paragraph');
    const index = wp.data
      .select('core/block-editor')
      .getBlockIndex(afterBlockId);
    blockEditor.insertBlock(block, index + 1);
    blockEditor.selectBlock(block.clientId);
  }

  // Add event listener to the editor wrapper
  const editorWrapper = document.querySelector('.block-editor-writing-flow');

  if (editorWrapper) {
    editorWrapper.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        console.log('pressed enter!');

        const selectedBlock = wp.data
          .select('core/block-editor')
          .getSelectedBlock();
        if (selectedBlock) {
          event.preventDefault();
          insertParagraphBlock(selectedBlock.clientId);

          console.log('inserted block!');
        }
      }
    });
  }
});
