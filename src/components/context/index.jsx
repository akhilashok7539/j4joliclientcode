import createRhinoState from 'react-rhino';

const { RhinoProvider, useRhinoState, useSetRhinoState } = createRhinoState({
  user: {},
  filters: {
    district: 'All',
    job_category: 'All',
    job_no: '',
    status: 'All',
    job_location: '',
    job_title: ''
  },
  installable: {
    installable: false,
    deferredPrompt: null,
  },
});

export { RhinoProvider, useRhinoState, useSetRhinoState };
