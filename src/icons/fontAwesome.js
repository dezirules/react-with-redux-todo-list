import fontAwesome from '@fortawesome/fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faSquare from '@fortawesome/fontawesome-free-regular/faSquare';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';

// put the <svg> inside the <i> instead of removing it
// fixes: The node to be removed is not a child of this node.
fontAwesome.config = {autoReplaceSvg: 'nest'};

fontAwesome.library.add(faTimes);
fontAwesome.library.add(faCheck);
fontAwesome.library.add(faSquare);
fontAwesome.library.add(faAngleDown);

export default fontAwesome;