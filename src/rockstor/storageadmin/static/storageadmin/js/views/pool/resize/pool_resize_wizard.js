PoolResizeWizardView = WizardView.extend({
  initialize: function() {
    WizardView.prototype.initialize.apply(this, arguments);
    this.pages = [];
  },
    
  setCurrentPage: function() {
    var choice = this.model.get('choice');
    var page = null;
    if (_.isUndefined(this.pages[this.currentPageNum]) ||
        _.isNull(this.pages[this.currentPageNum])) {
      if (_.isUndefined(choice)) {
        this.pages[0] = PoolResizeChoice;
      } else if (choice == 'add') {
          this.pages[1] = PoolAddDisksRaid;
          this.pages[2] = PoolAddDisks;
          this.pages[3] = PoolResizeSummary;
        } else if (choice == 'remove') {
          this.pages[1] = PoolRemoveDisks;
          this.pages[2] = PoolResizeSummary;
        } else if (choice == 'raid') {
          this.pages[1] = PoolRaidChange;
          this.pages[2] = PoolResizeSummary;
        }
    }
    this.currentPage = new this.pages[this.currentPageNum]({
      model: this.model,
      parent: this,
      evAgg: this.evAgg
    });
  },

  lastPage: function() {
    return ((this.pages.length > 1) 
            && ((this.pages.length-1) == this.currentPageNum));
  },

  modifyButtonText: function() {
    switch(this.currentPageNum) {
      case 0:
        this.$('#ph-wizard-buttons').hide();
        break;
      default:
        this.$('#ph-wizard-buttons').show();
        break;
    }
    if (this.lastPage()) {
      this.$('#next-page').html('Resize');
    } else {
      this.$('#next-page').html('Next');
    }
  },

  finish: function() {
    this.parent.$('#pool-resize-raid-overlay').overlay().close();
    this.parent.render();
  },

});
