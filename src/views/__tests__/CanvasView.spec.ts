import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import CanvasView from '../CanvasView.vue';
import { createTestingPinia } from '@pinia/testing';
import { vi } from 'vitest';

describe('CanvasView', () => {
  it('renders properly', () => {
    const wrapper = mount(CanvasView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });
    expect(wrapper).toBeDefined();
  });
});
