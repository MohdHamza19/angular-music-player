import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public isScreenSmall!: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.breakpointObserver
      // .observe([Breakpoints.XSmall])
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches
      })
  }

  toggleNow() {
    this.router.navigate(['now-playing'], { relativeTo: this.route })
  }
  toggleNew() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  togglePlay() {
    this.router.navigate(['playlist'], { relativeTo: this.route })
  }
  toggleAll() {
    this.router.navigate(['all'], { relativeTo: this.route })
  }

}
