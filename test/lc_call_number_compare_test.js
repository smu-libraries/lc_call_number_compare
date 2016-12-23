let lc = require('../lib/lc_call_number_compare');
let assert = require('assert');

let a = 'AM101 .S3533 L58 1987b';
let b = 'HF5381 .S5145 2008';
let c = 'PE1479 .B87 O93 1993';

describe('cmp', () => {
  describe('x > y', () => {
    it('should return a positive value', () => {
      assert(lc.cmp(b, a) > 0);
    });
  });
  describe('x < y', () => {
    it('should return a negative value', () => {
      assert(lc.cmp(a, b) < 0);
    });
  });
  describe('x == y', () => {
    it('should return 0', () => {
      assert(lc.cmp(a, a) === 0);
    });
  });
});

describe('eq', () => {
  describe('x == y', () => {
    it('should return true', () => {
      assert(lc.eq(a, a));
    });
  });
  describe('x != y', () => {
    it('should return false', () => {
      assert(!lc.eq(a, b));
    });
  });
});

describe('gt', () => {
  describe('x > y', () => {
    it('should return true', () => {
      assert(lc.gt(b, a));
    });
  });
  describe('x < y', () => {
    it('should return false', () => {
      assert(!lc.gt(a, b));
    });
  });
  describe('x == y', () => {
    it('should return false', () => {
      assert(!lc.gt(a, a));
    });
  });
});

describe('gte', () => {
  describe('x > y', () => {
    it('should return true', () => {
      assert(lc.gte(b, a));
    });
  });
  describe('x < y', () => {
    it('should return false', () => {
      assert(!lc.gte(a, b));
    });
  });
  describe('x == y', () => {
    it('should return true', () => {
      assert(lc.gte(a, a));
    });
  });
});

describe('lt', () => {
  describe('x < y', () => {
    it('should return true', () => {
      assert(lc.lt(a, b));
    });
  });
  describe('x > y', () => {
    it('should return false', () => {
      assert(!lc.lt(b, a));
    });
  });
  describe('x == y', () => {
    it('should return false', () => {
      assert(!lc.lt(a, a));
    });
  });
});

describe('lte', () => {
  describe('x < y', () => {
    it('should return true', () => {
      assert(lc.lte(a, b));
    });
  });
  describe('x > y', () => {
    it('should return false', () => {
      assert(!lc.lte(b, a));
    });
  });
  describe('x == y', () => {
    it('should return true', () => {
      assert(lc.lte(a, a));
    });
  });
});

let d = 'am101 .s3533 l58 1987b';
let D = 'AM101 .S3533 L58 1987b';
let d_short = 'am101 .s3533';

describe('options', () => {
  describe('a cmp A when case_sensitive = false', () => {
    it('should return 0', () => {
      assert(lc.cmp(d, D, { case_sensitive: false }) === 0);
    });
  });
  describe('a cmp A when case_sensitive = true', () => {
    it('should return a positive value', () => {
      assert(lc.cmp(d, D, { case_sensitive: true }) > 0);
    });
  });
  describe('less-specific a cmp more-specific A when case_sensitive = false', () => {
    it('should return a negative value', () => {
      assert(lc.cmp(d_short, D, { case_sensitive: false }) < 0);
    });
  });
  describe('less-specific a cmp more-specific A when case_sensitive = true', () => {
    it('should return a positive value', () => {
      assert(lc.cmp(d_short, D, { case_sensitive: true }) > 0);
    });
  });
});
