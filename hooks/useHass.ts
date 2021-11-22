import useHassStore from "../stores/hass.store";

const useHass = () => {
  const {
    connection,
    entities,
    services,
    config,
  } = useHassStore();

  return {
    connection,
    entities,
    services,
    config,
  }
};

export default useHass;