import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

import config from './config.mjs';

register(StyleDictionary, {
    excludeParentKeys: true,
    expand: {
        typography: true,
    },
});

const sd = new StyleDictionary(config);

await sd.buildAllPlatforms();
