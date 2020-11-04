import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import {
  Grid,
  Button,
  Divider,
  Box,
} from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import SqueakDetailItem from "../../components/SqueakDetailItem";
import SqueakThreadItem from "../../components/SqueakThreadItem";

import {
  getSqueakDisplayRequest,
  getAncestorSqueakDisplaysRequest,
} from "../../squeakclient/requests"


export default function SqueakPage() {
  var classes = useStyles();
  const history = useHistory();
  const { hash } = useParams();
  const [squeak, setSqueak] = useState(null);
  const [ancestorSqueaks, setAncestorSqueaks] = useState([]);

  const getSqueak = (hash) => {
      getSqueakDisplayRequest(hash, setSqueak);
  };
  const getAncestorSqueaks = (hash) => {
      getAncestorSqueakDisplaysRequest(hash, setAncestorSqueaks);
  };

  const unknownAncestorHash = () => {
      if (!ancestorSqueaks) {
        return null;
      }
      var oldestKnownAncestor = ancestorSqueaks[0];
      if (!oldestKnownAncestor) {
        return null;
      }
      console.log(oldestKnownAncestor);
      console.log("oldestKnownAncestor");
      return oldestKnownAncestor.getReplyTo();
  };

  useEffect(()=>{
    getSqueak(hash)
  },[hash]);
  useEffect(()=>{
    getAncestorSqueaks(hash)
  },[hash]);

  function NoSqueakContent() {
    return (
      <div>
        Unable to load squeak.
      </div>
    )
  }

  function UnkownReplyToContent() {
    var squeakHash = unknownAncestorHash();
    if (!squeakHash) {
      return (
        <></>
      )
    }
    return (
      <div>
          <Box
            key={squeakHash}
            >
          <SqueakThreadItem
            hash={squeakHash}
            key={squeakHash}
            squeak={null}>
          </SqueakThreadItem>
          <Divider />
          </Box>
      </div>
    )
  }

  function AncestorsContent() {
    return (
      <div>
        {ancestorSqueaks.slice(0, -1)
          //.reverse()
          .map(ancestorSqueak =>
          <Box
            key={ancestorSqueak.getSqueakHash()}
            >
          <SqueakThreadItem
            hash={ancestorSqueak.getSqueakHash()}
            key={ancestorSqueak.getSqueakHash()}
            squeak={ancestorSqueak}>
          </SqueakThreadItem>
          <Divider />
          </Box>
        )}
      </div>
    )
  }

  function SqueakContent() {
    return (
      <>
        {UnkownReplyToContent()}
        {AncestorsContent()}
        <div>
          <SqueakDetailItem
            hash={hash}
            squeak={squeak}>
          </SqueakDetailItem>
        </div>
      </>
    )
  }

  return (
    <>
      <PageTitle title="Squeak" />
      {SqueakContent()}
    </>
  );
}