import { connect as reduxConnect } from 'react-redux';

export function connect(mapStateToProps, mapDispatchToProps) {
  return (target) => <any>reduxConnect(mapStateToProps, mapDispatchToProps)(target);
}
