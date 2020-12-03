import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as CKSource from '../../../vendor/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild( 'sidebar', { static: true } ) private sidebarContainer?: ElementRef<HTMLDivElement>;

  public Editor = CKSource.Editor;
  public editorConfig: any = {};

  public data = this.getInitialData();

  public watchdog: any;

  public ngOnInit() {
    const contextConfig = {
      sidebar: {
        container: this.sidebar
      },
      commentsOnly: true,
      toolbar: { items: ['comment'] },
      licenseKey: '<LICENSE_KEY>',
    };

    this.watchdog = new CKSource.ContextWatchdog( CKSource.Context );

    this.watchdog.setCreator( async config => {
      const context = await CKSource.Context.create( config );
      this.initIntegration( context );
      return context;
    } );

    this.watchdog.create( contextConfig )
      .then( () => {
        console.log( 'ready' );
      } );
  }

  // Note that Angular refs can be used once the view is initialized so we need to create
  // these containers and use in the above editor configuration to workaround this problem.
  private sidebar = document.createElement( 'div' );

  public ngAfterViewInit() {
    if ( !this.sidebarContainer ) {
      throw new Error( 'Div containers for sidebar or presence list were not found' );
    }

    this.sidebarContainer.nativeElement.appendChild( this.sidebar );
  }

  public outsideEditorComment( event: Event) {
    const context = this.watchdog.context;
    const repository = context.plugins.get( 'CommentsRepository' );
    // const channelId = context.config.get( 'collaboration.channelId' );
    const threadId = 'outside-editor-comment-thread';

    // DOM element that is a container for the button and the form field element.
    const fieldHolder = ( event.currentTarget as HTMLElement ).parentNode;

    // if ( !repository.hasCommentThread( threadId ) ) {
      // Creates a new, empty, local comment thread.
      // Creates annotation view (sidebar balloon) for the thread and attaches it to `fieldHolder`.
      // Sets the comment thread and active and focuses selection in the comment input field.
    repository.openNewCommentThread( {
      // channelId,
      authorId: '1',
      threadId,
      target: fieldHolder
    });
    // } else {
    //   // Sets the comment as active. Triggers events.
    //   repository.setActiveCommentThread( threadId );
    // }
  }


  private initIntegration( context: any ) {
    console.log('initIntegration');
    const repository = context.plugins.get( 'CommentsRepository' );
    const users = context.plugins.get('Users');

    users.addUser({
      id: '1',
      name: 'John',
    });
    users.defineMe('1');
  }

  private getInitialData(): any {
    return `
      <h2>Bilingual Personality Disorder</h2>
      <p>
        This may be the first time you hear about this made-up disorder but it actually isn’t so far from the truth. Even the studies
        that were conducted almost half a century show that <strong>the language you speak has more effects on you than you realize</strong>.
      </p>
      <p>
        One of the very first experiments conducted on this topic dates back to 1964.
        <a href="https://www.researchgate.net/publication/9440038_Language_and_TAT_content_in_bilinguals">In the experiment</a>
        designed by linguist Ervin-Tripp who is an expert in psycholinguistic and sociolinguistic studies, adults who are bilingual
        in English in French were showed series of pictures and were asked to create 3-minute stories. In the end participants emphasized
        drastically different dynamics for stories in English and French.
      </p>
    `;
  }
}
