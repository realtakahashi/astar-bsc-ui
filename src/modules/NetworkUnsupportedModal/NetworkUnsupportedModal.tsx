import React, { useEffect, useState } from "react";
import { CustomModal } from "../../components";
import {
  Button,
  ExclamationCircleInverseSvg,
  Typography,
  useLocation,
} from "@chainsafe/common-components";
import { useNetworkManager, useHomeBridge } from "../../contexts";
import { ROUTE_LINKS } from "../../routes";
import { chainbridgeConfig } from "../../chainbridgeConfig";
import { useStyles } from "./styles";

const NetworkUnsupportedModal = () => {
  const classes = useStyles();
  const { homeChainConfig, networkId } = useNetworkManager();
  const { getNetworkName, wrapTokenConfig, isReady } = useHomeBridge();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [supportedNetworks, setSupportedNetworks] = useState<number[]>([]);

  useEffect(() => {
    if (pathname === ROUTE_LINKS.Transfer) {
      setOpen(!homeChainConfig && !!isReady);
      setSupportedNetworks(
        chainbridgeConfig.chains
          .filter((bc) => bc.networkId !== undefined)
          .map((bc) => Number(bc.networkId))
      );
    } else if (pathname === ROUTE_LINKS.Wrap) {
      setOpen(!wrapTokenConfig && !!isReady);
      setSupportedNetworks(
        chainbridgeConfig.chains
          .filter((bc) => bc.networkId !== undefined)
          .filter((bc) => bc.tokens.find((t) => t.isNativeWrappedToken))
          .map((bc) => Number(bc.networkId))
      );
    } else {
      setOpen(false);
      setSupportedNetworks([]);
    }
  }, [pathname, setOpen, homeChainConfig, isReady, wrapTokenConfig]);

  return (
    <CustomModal
      className={classes.root}
      injectedClass={{
        inner: classes.inner,
      }}
      active={open}
    >
      <section>
        <ExclamationCircleInverseSvg className={classes.icon} />
      </section>
      <section>
        <Typography className={classes.heading} variant="h3" component="h3">
          Network Unsupported
        </Typography>
        <Typography component="p" variant="body1">
          This app does not currently support transfers on{" "}
          {getNetworkName(networkId)}. Please change networks from within your
          browser wallet.
        </Typography>
        <br />
        <Typography component="p" variant="body1">
          This app is configured to work on{" "}
          {supportedNetworks.map(
            (n, i) =>
              `${getNetworkName(n)}${
                i < supportedNetworks.length - 1 ? ", " : ""
              }`
          )}{" "}
          networks
        </Typography>
        <section className={classes.buttons}>
          <a
            rel="noopener noreferrer"
            href={process.env.REACT_APP_SUPPORT_URL}
            target="_blank"
          >
            <Button variant="outline">
              Ask a question on {process.env.REACT_APP_SUPPORT_SERVICE}
            </Button>
          </a>
        </section>
      </section>
    </CustomModal>
  );
};

export default NetworkUnsupportedModal;
