//Audio Player Class
var AudioPlayer = function () {
  this._playlist = null;
  this._currentSongIndex = 0;

  this._getContainer = function () {
    if (this._$container == null) {
      this._$container = $('<div>');
      this._$container.addClass('container');
      this._$container.append(this._getAudio());
      this._$container.append(this._getList());
    }
    return this._$container;
  };

  this._getAudio = function () {
    if (this._$audio == null) {
      this._$audio = $('<audio>');
      this._$audio.attr('preload', true);
      this._$audio.attr('controls', '');
      this._$audio[0].src = this._playlist[this._currentSongIndex]['url'];
      this._$audio[0].addEventListener('ended', this._handleAudioEnded.bind(this));
    }
    return this._$audio;
  };

  this._getList = function () {
    if (this._$list == null) {
      this._$list = $('<ul>');
      this._$list.addClass('list');
      for (var i = 0; i < this._playlist.length; i++) {
        var currentAudioUrl = this._playlist[i],
            $listItem = $('<li>');
        $listItem.addClass('list-item');
        $listItem.attr('audio-url', currentAudioUrl.url);
        $listItem.on('click', this._handListItemClick.bind(this));
        $listItem.text(currentAudioUrl.name + ' - ' + currentAudioUrl.duration);
        this._$list.append($listItem);
      }
      this._$list.find('li').eq(this._currentSongIndex).addClass('active');
    }
    return this._$list;
  };

  this._handListItemClick = function (e) {
    var $this = $(e.currentTarget);
    this._currentSongIndex = $this.index();
    this._playAudioFromCurrentIndex();
  };

  this._handleAudioEnded = function (e) {
    this._currentSongIndex++;
    if (this._currentSongIndex == this._playlist.length) this._currentSongIndex = 0;
    this._playAudioFromCurrentIndex();
  };

  this._playAudioFromCurrentIndex = function () {
    var $allListItems = this._getList().find('li'),
        $targetListItem = this._getList().find('li').eq(this._currentSongIndex),
        audioUrl =  $targetListItem.attr('audio-url');
    $allListItems.removeClass('active');
    $targetListItem.addClass('active');
    this._getAudio()[0].src = audioUrl;
    this._getAudio()[0].load();
    this._getAudio()[0].play();
  };

  this.setPlaylist = function (playlist) {
    this._playlist = playlist;
  };

  this.getHtml = function () {
    return this._getContainer();
  };
};
