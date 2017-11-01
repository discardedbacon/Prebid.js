import { isValidVideoBid } from 'src/video';
import { newConfig } from 'src/config';
import * as utils from 'src/utils';

describe('video.js', () => {
  it('validates valid instream bids', () => {
    const bid = {
      adId: '123abc',
      vastUrl: 'http://www.example.com/vastUrl'
    };
    const bidRequests = [{
      bids: [{
        bidId: '123abc',
        bidder: 'appnexusAst',
        mediaTypes: {
          video: { context: 'instream' }
        }
      }]
    }];
    const valid = isValidVideoBid(bid, bidRequests);
    expect(valid).to.be(true);
  });

  it('catches invalid instream bids', () => {
    const bid = {
      adId: '123abc'
    };
    const bidRequests = [{
      bids: [{
        bidId: '123abc',
        bidder: 'appnexusAst',
        mediaTypes: {
          video: { context: 'instream' }
        }
      }]
    }];
    const valid = isValidVideoBid(bid, bidRequests);
    expect(valid).to.be(false);
  });

  it('catches invalid bids when prebid-cache is disabled', () => {
    sinon.stub(utils, 'getBidRequest', () => ({
      bidder: 'vastOnlyVideoBidder',
      mediaTypes: { video: {} },
    }));

    const config = newConfig();
    config.setConfig({ usePrebidCache: false });

    const valid = isValidVideoBid({ vastXml: '<xml>vast</xml>' });

    expect(valid).to.be(false);
  });

  it('validates valid outstream bids', () => {
    const bid = {
      adId: '123abc',
      renderer: {
        url: 'render.url',
        render: () => true,
      }
    };
    const bidRequests = [{
      bids: [{
        bidId: '123abc',
        bidder: 'appnexusAst',
        mediaTypes: {
          video: { context: 'outstream' }
        }
      }]
    }];
    const valid = isValidVideoBid(bid, bidRequests);
    expect(valid).to.be(true);
  });

  it('catches invalid outstream bids', () => {
    const bid = {
      adId: '123abc'
    };
    const bidRequests = [{
      bids: [{
        bidId: '123abc',
        bidder: 'appnexusAst',
        mediaTypes: {
          video: { context: 'outstream' }
        }
      }]
    }];
    const valid = isValidVideoBid(bid, bidRequests);
    expect(valid).to.be(false);
  });
});
